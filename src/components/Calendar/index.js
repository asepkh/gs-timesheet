import { useEffect } from "react";
import moment from "moment";
import "./styles.less";
import { Badge, Tag } from "antd";

const Calendar = ({ date, data, onClickDay }) => {
  const weekDays = moment.weekdays(),
    daysInMonth = moment(date).daysInMonth(),
    firstDay = parseInt(moment(date).startOf("month").format("d")),
    nationalDay = (day) =>
      data?.nationalHolidays?.filter(
        (e) =>
          e.holiday_date ===
          moment(`${moment(date).format("YYYY-MM")}-${day}`).format("YYYY-MM-D")
      ).length > 0
        ? data?.nationalHolidays?.filter(
            (e) =>
              e.holiday_date ===
              moment(`${moment(date).format("YYYY-MM")}-${day}`).format(
                "YYYY-MM-D"
              )
          )[0]?.holiday_name
        : false,
    isWeekend = (day) =>
      moment(`${moment(date).format("YYYY-MM")}-${day}`).isoWeekday() === 6 ||
      moment(`${moment(date).format("YYYY-MM")}-${day}`).isoWeekday() === 7 ||
      data?.nationalHolidays?.filter(
        (e) =>
          e.holiday_date ===
          moment(`${moment(date).format("YYYY-MM")}-${day}`).format("YYYY-MM-D")
      ).length > 0;

  const tableData = [
    ...[...Array(firstDay)].map((_, i) => null),
    ...[...Array(daysInMonth)].map((_, i) => i + 1),
  ];

  const sumArrayOfObject = (arr, key) =>
    arr?.reduce((a, b) => +a + +b[key], 0) || null;

  const totalRows =
    tableData.length % 7 === 0
      ? tableData.length / 7
      : Math.floor(tableData.length / 7) + 1;

  const tableRows = [...Array(totalRows)].map((_, i) =>
    [...Array(7)].map((_, ii) => {
      const day = tableData[i * 7 + ii] || null,
        workDatas =
          data?.timesheets?.filter(
            (d) =>
              d.date ===
              moment(`${moment(date).format("YYYY-MM")}-${day}`).format(
                "YYYY-MM-DD"
              )
          ) || [];
      const tableRowsData = {
        day,
        date: moment(`${moment(date).format("YYYY-MM")}-${day}`).format(
          "YYYY-MM-DD"
        ),
        timesheets: workDatas,
        totalWorkHours: sumArrayOfObject(workDatas, "workHours"),
      };
      return tableRowsData;
    })
  );

  useEffect(() => {
    console.log({ tableData, firstDay, tableRows });
  }, []);

  return (
    <table id="calendar">
      <thead>
        <tr>
          <th colSpan="7">Jam Kerja</th>
          <th colSpan="1" rowSpan="2" style={{ maxWidth: 80 }}>
            Total Jam Kerja Mingguan
          </th>
        </tr>
        <tr>
          {weekDays.map((day, i) => (
            <th
              key={i}
              className={((i === 0 || i === 6) && "weekend") || "weekday"}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, i) => (
          <tr key={i} className="days">
            {row.map((d, ii) => (
              <td
                className={`${!d?.day ? "blank" : ""} ${
                  isWeekend(d?.day) ? "weekend" : "workday"
                }`}
                key={ii}
                onClick={() => (d?.day && onClickDay(d)) || {}}
              >
                {nationalDay(d?.day) ? (
                  <Tag className="national-holiday" color="red">
                    {nationalDay(d?.day)}
                  </Tag>
                ) : (
                  <></>
                )}
                <b>{d?.day}</b>
                <br />
                {d?.day && d?.totalWorkHours ? d?.totalWorkHours + " Jam" : ""}
              </td>
            ))}
            <td>
              {!!sumArrayOfObject(tableRows[i], "totalWorkHours")
                ? sumArrayOfObject(tableRows[i], "totalWorkHours") + " Jam"
                : "-"}
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="6" style={{ textAlign: "left" }}>
            Keterangan: <br />
            {data?.timesheets?.map((d) =>
              d?.description || d?.izin !== "hadir" ? (
                <>
                  - {moment(d?.date).format("DD MMMM YYYY")}:{" "}
                  {d.izin.charAt(0).toUpperCase() + d.izin.slice(1)} -{" "}
                  {d?.description || "Tanpa Keterangan"}
                  <br />
                </>
              ) : (
                <></>
              )
            )}
          </td>
          <td style={{ textAlign: "center" }}>TOTAL</td>
          <td style={{ textAlign: "center" }}>
            {sumArrayOfObject(data?.timesheets, "workHours")
              ? sumArrayOfObject(data?.timesheets, "workHours") + " Jam"
              : "-"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

Calendar.defaultProps = {
  date: moment().format("YYYY-MM"),
  data: { timesheets: [] },
  onClickDay: (d) => {
    console.log(d);
  },
};
export default Calendar;
