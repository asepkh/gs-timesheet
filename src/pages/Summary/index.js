import moment from "moment";
import useController from "./controller";
import { Table, Row, Select, Tag, List, Col } from "antd";

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
  const {
    column,
    data,
    isLoading,
    isFetching,
    totalPages,
    res,
    DownloadExcel,
    queries,
    setQueries,
  } = useController();

  const dateFormat = queries?.year + "-" + queries?.month;

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
            value={queries?.custom ? "custom" : moment(dateFormat).format("YYYY-MM")}
            onChange={(value) =>
              setQueries(
                value === "custom"
                  ? { custom: true }
                  : {
                      custom: false,
                      month: moment(value).format("M"),
                      year: moment(value).format("YYYY"),
                    }
              )
            }
          >
            <Option value={moment().subtract(1, "months").endOf("month").format("YYYY-MM")}>
              Bulan terakhir
            </Option>
            <Option value={moment().format("YYYY-MM")}>Bulan ini</Option>
            <Option value="custom">Pilih Sendiri</Option>
          </Select>
          <Select
            disabled={!queries?.custom}
            style={{ width: 120, marginRight: 10 }}
            value={queries?.month}
            onChange={(value) => setQueries({ month: value })}
          >
            {moment.months().map((month, index) => (
              <Option value={(index + 1).toString()} key={index}>
                {month}
              </Option>
            ))}
          </Select>
          <Select
            disabled={!queries?.custom}
            value={queries?.year}
            onChange={(value) => setQueries({ year: value })}
          >
            <Option value={moment().subtract(1, "year").endOf("year").format("YYYY")}>
              {moment().subtract(1, "year").endOf("year").format("YYYY")}
            </Option>
            <Option value={moment().format("YYYY")}>{moment().format("YYYY")}</Option>
            <Option value={moment().add(1, "year").endOf("year").format("YYYY")}>
              {moment().add(1, "year").endOf("year").format("YYYY")}
            </Option>
          </Select>
          <DownloadExcel />
        </Row>
      </Row>
      <Table
        columns={column}
        expandable={{
          expandedRowRender: (record) => (
            <Row gutter={[10, 10]} key={record}>
              <Col xs={24} md={12}>
                <List
                  size="small"
                  header={<h4>Worktime Allocations</h4>}
                  bordered
                  dataSource={record?.timesheets?.workLocations}
                  renderItem={(d) => (
                    <List.Item>
                      <b>{d?.name} </b>: {d?.workHours} Jam
                    </List.Item>
                  )}
                />
              </Col>
              <Col xs={24} md={12}>
                <List
                  size="small"
                  header={<h4>Keterangan Tertulis</h4>}
                  bordered
                  dataSource={record?.timesheets?.descriptions}
                  renderItem={(d) => (
                    <List.Item className={d?.izin !== "hadir" ? "izin" : "hadir"}>
                      <b>{moment(d?.queries).format("DD MMMM YYYY")}</b>: {d?.description}
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          ),
          rowExpandable: (record) =>
            record?.timesheets?.workLocations.length > 0 ||
            record?.timesheets?.descriptions?.length > 0,
        }}
        dataSource={data}
        scroll={{ x: 1200 }}
        loading={isLoading || isFetching}
        pagination={{
          total: totalPages * queries?.limit,
          current: queries?.page,
          onChange: (page) => setQueries({ page }),
        }}
        bordered
      />
    </>
  );
};

export default Summary;
