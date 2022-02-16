import { useEffect } from "react";
import moment from "moment";
import "./styles.css";

const Calendar = ({ date }) => {
  const weekDays = moment.weekdays(),
    daysInMonth = moment(date).daysInMonth(),
    firstDay = parseInt(moment(date).startOf("month").format("d"));

  const tableData = [
    ...[...Array(firstDay)].map((_, i) => null),
    ...[...Array(daysInMonth)].map((_, i) => i + 1),
  ];

  const tableRows =
    tableData.length % 7 === 0
      ? tableData.length / 7
      : Math.floor(tableData.length / 7) + 1;

  useEffect(() => {
    console.log({ tableData, firstDay });
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
            <th key={day} style={{ color: !i || i === 6 ? "red" : "black" }}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(tableRows)].map((_, i) => (
          <tr className="days" key={i}>
            {[...Array(7)].map((_, ii) =>
              !ii || ii === 6 ? (
                <td
                  style={{
                    color: "red",
                    background: !!tableData[i * 7 + ii]
                      ? "transparent"
                      : "#ddd",
                  }}
                >
                  {tableData[i * 7 + ii]}
                </td>
              ) : (
                <td
                  style={{
                    background: !!tableData[i * 7 + ii]
                      ? "transparent"
                      : "#ddd",
                  }}
                >
                  {(!!tableData[i * 7 + ii] && tableData[i * 7 + ii]) || ""}
                  <br />
                  <i>
                    {!!tableData[i * 7 + ii] &&
                      Math.floor(Math.random() * 8) + 1 + " Jam"}
                  </i>
                </td>
              )
            )}
            <td>{Math.floor(Math.random() * 24) + 1} Jam</td>
          </tr>
        ))}
        <tr>
          <td colSpan="6"></td>
          <td style={{ textAlign: "center" }}>TOTAL</td>
          <td style={{ textAlign: "center" }}>54 Jam</td>
        </tr>
      </tbody>
    </table>
  );
};

Calendar.defaultProps = {
  date: moment().format("YYYY-MM"),
};
export default Calendar;
