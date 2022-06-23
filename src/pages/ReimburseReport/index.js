import moment from "moment";
import useController from "./controller";
import { Table, Row, Select } from "antd";

const { Option } = Select;
const Summary = () => {
  const {
    column,
    data,
    isLoading,
    isFetching,
    totalPages,
    queries,
    setQueries,
    column_expandable,
    DownloadExcel,
  } = useController();

  const dateFormat = queries?.year + "-" + queries?.month;

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <div />
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
            <Table
              columns={column_expandable}
              dataSource={record?.reimbursements.map((d, i) => ({ i, ...d }))}
              bordered
              pagination={false}
            />
          ),
          rowExpandable: (record) => record?.reimbursements?.length > 0,
        }}
        dataSource={data}
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
