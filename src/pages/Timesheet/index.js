import moment from "moment";
import { useState /*, useEffect*/ } from "react";

import { useQuery, useMutation } from "react-query";
import { getProject } from "@/services/project";
import { addTimesheet, getTimesheet } from "@/services/timesheet";

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
  // const [workData, setWorkData] = useState({});
  const dateFormat = date?.year + "-" + date?.month;

  const { data: companyList } = useQuery("projectAll", () => getProject(), {
    refetchOnWindowFocus: false,
  });

  const {
    data: workData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery(["timesheet", { date: dateFormat }], () =>
    getTimesheet({ date: dateFormat })
  );

  const add = useMutation(
    (values) => {
      return addTimesheet(values);
    },
    {
      onSuccess: () => {
        message.success("Timesheet Saved Successfully");
        // refetch();
      },
      onError: (error) => {
        message.error(
          error?.response?.data?.errorMessage || "Add Timesheet Failed"
        );
      },
    }
  );

  const onFinish = (values) => {
    console.log(values);
    add.mutate(values);
  };

  return (
    <Card>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 600 }}>Timesheet</h3>
        <div style={{ display: "flex" }}>
          <Select
            style={{ width: 150, marginRight: 10 }}
            value={custom ? "custom" : date?.month}
            onChange={(value) => {
              if (value === "custom") setCustom(true);
              else {
                setCustom(false);
                setDate({ ...date, month: value });
              }
            }}
          >
            <Option
              value={moment().subtract(1, "months").endOf("month").format("M")}
            >
              Bulan terakhir
            </Option>
            <Option value={moment().format("M")}>Bulan ini</Option>
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
        onClickDay={(data) => setModal({ visible: true, data })}
      />
      <ModalTimesheet
        {...modal}
        onFinish={onFinish}
        companyList={companyList?.data?.rows || []}
        onCancel={() => setModal({ visible: false, date: null })}
      />
    </Card>
  );
};

export default Timesheet;
