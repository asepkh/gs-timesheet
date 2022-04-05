import { useEffect } from "react";
import moment from "moment";
import "./styles.css";

const Calendar = ({ date, workData, onClickDay }) => {
  const weekDays = moment.weekdays(),
    daysInMonth = moment(date).daysInMonth(),
    firstDay = parseInt(moment(date).startOf("month").format("d")),
    isWeekend = (day) =>
      moment(`${moment(date).format("YYYY-MM")}-${day}`).isoWeekday() === 6 ||
      moment(`${moment(date).format("YYYY-MM")}-${day}`).isoWeekday() === 7;

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
      const day = tableData[i * 7 + ii] || null;
      const tableRowsData = {
        day,
        date: moment(`${moment(date).format("YYYY-MM")}-${day}`).format(
          "YYYY-MM-DD"
        ),
        workData:
          workData?.data?.rows?.filter(
            (data) =>
              data.date ===
              moment(`${moment(date).format("YYYY-MM")}-${day}`).format(
                "YYYY-MM-DD"
              )
          ) || [],
        // workData: workData[day],
        // totalWorkHours: sumArrayOfObject(workData[day], "workHours") || null,
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
            <th key={i} className={(i === 0 || i === 6) && "weekend"}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, i) => (
          <tr key={i} className="days">
            {row.map((data, ii) => (
              <td
                className={`${!data?.day ? "blank" : ""} ${
                  isWeekend(data?.day) ? "weekend" : "workday"
                }`}
                key={ii}
                onClick={() => (data?.day && onClickDay(data)) || {}}
              >
                {data?.day}
                <br />
                {data?.day && data?.totalWorkHours
                  ? data?.totalWorkHours + " Jam"
                  : ""}
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
            Keterangan: <br /> - {moment(date).format("DD MMMM YYYY")}: Overtime
            untuk mengerjakan projek lain
          </td>
          <td style={{ textAlign: "center" }}>TOTAL</td>
          <td style={{ textAlign: "center" }}>54 Jam</td>
        </tr>
      </tbody>
    </table>
  );
};

Calendar.defaultProps = {
  date: moment().format("YYYY-MM"),
  // workData: [{
  //   1: [
  //     {
  //       company: "RICI",
  //       workHours: 9,
  //       keterangan: "Lembur menyelesaikan deadline aplikasi",
  //     },
  //     { company: "RICI", workHours: 8 },
  //   ],
  //   2: [{ company: "RICI", workHours: 8 }],
  //   3: [{ company: "RICI", workHours: 8 }],
  //   4: [{ company: "RICI", workHours: 8 }],
  // }],
  workData: [],
  onClickDay: (data) => {
    console.log(data);
  },
};
export default Calendar;
