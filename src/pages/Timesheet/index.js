import moment from "moment";
import { useEffect, useState /*, useEffect*/ } from "react";

import { useQuery, useMutation } from "react-query";
import { getProject } from "@/services/project";
import { getWorkLocation } from "@/services/workLocation";
import {
  addTimesheet,
  getTimesheet,
  removeTimesheet,
} from "@/services/timesheet";

import { Card, Row, Select, message } from "antd";
import Calendar from "@/components/Calendar";
import ModalTimesheet from "@/components/ModalTimesheet";

const { Option } = Select;
const Timesheet = () => {
  const [custom, setCustom] = useState(false);
  const [date, setDate] = useState({
    year: moment().format("YYYY"),
    month: moment().format("M"),
  });
  const [modal, setModal] = useState({ visible: false, date: null });
  const dateFormat = date?.year + "-" + date?.month;

  const { data: companyList } = useQuery("projectAll", () => getProject(), {
      refetchOnWindowFocus: false,
    }),
    { data: workLocationList } = useQuery(
      "workLocationsAll",
      () => getWorkLocation(),
      {
        refetchOnWindowFocus: false,
      }
    );

  const {
    data: timesheet,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    ["timesheet", { date: dateFormat }],
    () => getTimesheet({ date: dateFormat }),
    { refetchOnWindowFocus: false }
  );

  const add = useMutation(
    (values) => {
      return addTimesheet(values);
    },
    {
      onSuccess: () => {
        message.success("Timesheet Saved Successfully");
        setModal({ ...modal, visible: false });
        refetch();
      },
      onError: (error) => {
        message.error(
          error?.response?.data?.errorMessage || "Add Timesheet Failed"
        );
      },
    }
  );

  const remove = useMutation(
    (id) => {
      return removeTimesheet(id);
    },
    {
      onSuccess: () => {
        message.success("Timesheet Removed Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(
          error?.response?.data?.errorMessage || "Remove Timesheet Failed"
        );
      },
    }
  );

  const onFinish = (values) => {
    console.log(values);
    add.mutate(values);
  };

  const onRemove = (id) => {
    if (!id) return;
    remove.mutate(id);
  };

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error]);

  useEffect(() => {
    if (isLoading || isFetching) return;

    message.loading({
      content: "Loading...",
      duration: 0.5,
      key: "loadingTimesheet",
    });
  }, [isLoading, isFetching]);

  return (
    <Card>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 600 }}>Timesheet</h3>
        <div style={{ display: "flex" }}>
          <Select
            style={{ width: 150, marginRight: 10 }}
            value={custom ? "custom" : moment(dateFormat).format("YYYY-MM")}
            onChange={(value) => {
              if (value === "custom") setCustom(true);
              else {
                setCustom(false);
                setDate({
                  month: moment(value).format("M"),
                  year: moment(value).format("YYYY"),
                });
              }
            }}
          >
            <Option
              value={moment()
                .subtract(1, "months")
                .endOf("month")
                .format("YYYY-MM")}
            >
              Bulan terakhir
            </Option>
            <Option value={moment().format("YYYY-MM")}>Bulan ini</Option>
            <Option value="custom">Pilih Sendiri</Option>
          </Select>
          <Select
            disabled={!custom}
            style={{ width: 120, marginRight: 10 }}
            value={date?.month}
            onChange={(value) => setDate({ ...date, month: value })}
          >
            {moment.months().map((month, index) => (
              <Option value={(index + 1).toString()} key={index}>
                {month}
              </Option>
            ))}
          </Select>
          <Select
            disabled={!custom}
            value={date?.year}
            onChange={(value) => setDate({ ...date, year: value })}
          >
            <Option
              value={moment().subtract(1, "year").endOf("year").format("YYYY")}
            >
              {moment().subtract(1, "year").endOf("year").format("YYYY")}
            </Option>
            <Option value={moment().format("YYYY")}>
              {moment().format("YYYY")}
            </Option>
            <Option
              value={moment().add(1, "year").endOf("year").format("YYYY")}
            >
              {moment().add(1, "year").endOf("year").format("YYYY")}
            </Option>
          </Select>
        </div>
      </Row>
      <Calendar
        date={dateFormat}
        data={timesheet?.data}
        onClickDay={(data) => {
          setModal({
            visible: true,
            data,
            initialValues: {
              timesheets:
                data?.timesheets?.length > 0
                  ? data?.timesheets
                  : [
                      {
                        workHours: 0,
                        date: data?.date,
                        izin: "hadir",
                      },
                    ],
            },
          });
          console.log(data);
        }}
      />
      <ModalTimesheet
        {...modal}
        onFinish={onFinish}
        onRemove={onRemove}
        companyList={companyList?.data?.rows || []}
        workLocationList={workLocationList?.data?.rows || []}
        onCancel={() => setModal({ visible: false, date: null })}
      />
    </Card>
  );
};

export default Timesheet;
