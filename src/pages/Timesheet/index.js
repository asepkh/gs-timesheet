import moment from "moment";
import useController from "./controller";

// Component imports
import { Card, Row, Select } from "antd";
import Calendar from "@/components/Calendar";
import ModalTimesheet from "@/components/ModalTimesheet";

const { Option } = Select;
const Timesheet = () => {
  const {
    date,
    setDate,
    modal,
    setModal,
    dateFormat,
    timesheet,
    companyList,
    workLocationList,
    onFinish,
    onRemove,
  } = useController();

  return (
    <Card>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 600 }}>Timesheet</h3>
        <div
          style={{ display: "flex", overflow: "auto", paddingBottom: 8 }}
          className="custom-scrollbar"
        >
          <Select
            style={{ width: 150, marginRight: 10 }}
            value={date?.custom ? "custom" : moment(dateFormat).format("YYYY-MM")}
            onChange={(value) => {
              if (value === "custom") setDate({ ...date, custom: true });
              else
                setDate({
                  ...date,
                  custom: false,
                  year: moment(value).format("YYYY"),
                  month: moment(value).format("M"),
                });
            }}
          >
            <Option value={moment().subtract(1, "months").endOf("month").format("YYYY-MM")}>
              Bulan terakhir
            </Option>
            <Option value={moment().format("YYYY-MM")}>Bulan ini</Option>
            <Option value="custom">Pilih Sendiri</Option>
          </Select>
          <Select
            disabled={!date?.custom}
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
            disabled={!date?.custom}
            value={date?.year}
            onChange={(value) => setDate({ ...date, year: value })}
          >
            <Option value={moment().subtract(1, "year").endOf("year").format("YYYY")}>
              {moment().subtract(1, "year").endOf("year").format("YYYY")}
            </Option>
            <Option value={moment().format("YYYY")}>{moment().format("YYYY")}</Option>
            <Option value={moment().add(1, "year").endOf("year").format("YYYY")}>
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
