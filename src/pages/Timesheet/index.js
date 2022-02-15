import Calendar from "@/components/Calendar";
import { Select } from "antd";
import moment from "moment";
import { useState } from "react";

const { Option } = Select;
const Timesheet = () => {
  const [date, setDate] = useState(moment());
  return (
    <div>
      <div style={{ display: "flex", paddingBottom: 20 }}>
        <Select
          style={{ width: 150 }}
          defaultValue={moment().format("YYYY-MM")}
          onChange={(value) => setDate(value)}
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
        </Select>
        <b style={{ padding: "5px 20px" }}>
          {moment(date).format("MMMM - YYYY")}
        </b>
      </div>
      <Calendar date={date} />
    </div>
  );
};

export default Timesheet;
