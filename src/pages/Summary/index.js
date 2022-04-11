import { useState } from "react";
import moment from "moment";
import useController from "./controller";

import { Table, Row, Select, Tag } from "antd";

const tag_list = [
  {
    title: "Total Hari",
    name: "totalDays",
    color: "green",
  },
  {
    title: "Total Hari Kerja",
    name: "totalWorkDays",
    color: "blue",
  },
  {
    title: "Total Hari Libur Nasional",
    name: "totalNationalHolidays",
    color: "magenta",
  },
  {
    title: "Total Hari Libur (+ Hari Libur Nasional)",
    name: "totalHolidays",
    color: "red",
  },
  {
    title: "Total Jam Kerja (eligible)",
    name: "totalWorkHours",
    color: "blue",
  },
];

const { Option } = Select;
const Summary = () => {
  const [custom, setCustom] = useState(false);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState({
    year: moment().format("YYYY"),
    month: moment().format("M"),
  });

  const dateFormat = date?.year + "-" + date?.month + "-01";

  const { column, data, isLoading, isFetching, totalPages, res } =
    useController({
      queries: { page, date: dateFormat },
      date,
    });

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <div className="tag-list">
          {tag_list.map((d, i) => (
            <Tag key={i} color={d.color}>
              {d?.title}: {res?.[d?.name]}
            </Tag>
          ))}
        </div>
        <Row align="middle">
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
        </Row>
      </Row>
      <Table
        columns={column}
        dataSource={data}
        loading={isLoading || isFetching}
        pagination={{
          total: totalPages,
          current: page,
          onChange: (currentPage) => setPage(currentPage),
        }}
        bordered
      />
    </>
  );
};

export default Summary;
