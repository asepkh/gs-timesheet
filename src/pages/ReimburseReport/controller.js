import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";

import { getDataSummary } from "@/services/reimburse";
import { message, Button, Image } from "antd";

import ReactExport from "react-data-export";

const { ExcelFile } = ReactExport,
  { ExcelSheet } = ExcelFile;

const useController = () => {
  const [queries, setQuery] = useState({
      page: 1,
      limit: 10,
      year: moment().format("YYYY"),
      month: moment().format("M"),
    }),
    setQueries = (params) => setQuery({ ...queries, ...params }),
    {
      data: res,
      isLoading,
      isFetching,
      isError,
      error,
      refetch,
    } = useQuery(["reimburseReportsAll", queries], () =>
      getDataSummary({ ...queries, date: queries?.year + "-" + queries?.month })
    );

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error]);

  const column = [
    {
      title: "#",
      key: "i",
      fixed: "left",
      dataIndex: "i",
      align: "center",
      render: (value) => value + 1,
      width: "40pt",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Total Reimburse",
      key: "reimbursementsTotal",
      dataIndex: "reimbursementsTotal",
      width: "120pt",
      align: "center",
      render: (value) => (value ? `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-"),
    },
  ];

  const column_expandable = [
    {
      title: "Tanggal",
      key: "date",
      dataIndex: "date",
      align: "center",
      width: "100pt",
      render: (value) => moment(value).format("DD-MM-YYYY"),
    },
    {
      title: "Keterangan",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Bukti Pembayaran",
      key: "images",
      dataIndex: "images",
      render: (value) =>
        value?.length > 0 ? (
          <Image.PreviewGroup>
            {value.map((data, i) => (
              <Image width={75} height={75} src={data?.url} key={i} />
            ))}
          </Image.PreviewGroup>
        ) : (
          "-"
        ),
    },
    {
      title: "Reimburse",
      key: "value",
      dataIndex: "value",
      width: "120pt",
      align: "center",
      render: (value) => (value ? `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-"),
    },
  ];

  const data =
    res?.data?.length > 0
      ? res?.data?.map((d, i) => ({
          ...d,
          key: i,
          i,
          name: d?.firstName + " " + d?.lastName,
        }))
      : [
          {
            key: 0,
            i: 0,
            name: "-",
          },
        ];

  const multiDataSet = [
    {
      columns: [
        {
          title: "No",
          width: { wch: 3 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        }, //pixels width
        {
          title: "Nama",
          width: { wch: 24 },
          style: {
            font: { sz: "12", bold: true },
          },
        }, //char width
        {
          title: "Role",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
          },
        },
        {
          title: "Total Reimburse",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
      ],

      data: data.map((d, i) => [
        {
          value: i + 1,
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          value: d.name,
          style: {
            alignment: {
              vertical: "center",
            },
          },
        },
        {
          value: d.role,
          style: {
            alignment: {
              vertical: "center",
            },
          },
        },
        {
          value: d.reimbursementsTotal
            ? `Rp. ${d.reimbursementsTotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "-",
          style: {
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
      ]),
    },
  ];

  const multiDataSet2 = [
    {
      columns: [
        {
          title: "No",
          width: { wch: 3 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        }, //pixels width
        {
          title: "Tanggal",
          width: { wch: 12 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        }, //char width
        {
          title: "Nama",
          width: { wch: 24 },
          style: {
            font: { sz: "12", bold: true },
          },
        }, //char width
        {
          title: "Keterangan",
          width: { wch: 40 },
          style: {
            font: { sz: "12", bold: true },
          },
        },
        {
          title: "Reimburse",
          width: { wch: 12 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
      ],
      data: [].concat(
        ...data.map((user) =>
          user?.reimbursements?.map((d, i) => [
            {
              value: i + 1,
              style: {
                font: { sz: "12", bold: true },
                alignment: { vertical: "center", horizontal: "center" },
              },
            },
            {
              value: moment(user.date).format("DD-MM-YYYY"),
              style: {
                alignment: {
                  vertical: "center",
                  horizontal: "center",
                },
              },
            },
            {
              value: user.name,
              style: {
                alignment: {
                  vertical: "center",
                },
              },
            },
            {
              value: d.description,
              style: {
                alignment: {
                  vertical: "center",
                },
              },
            },
            {
              value: d.value ? `Rp. ${d.value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-",
              style: {
                alignment: {
                  vertical: "center",
                  horizontal: "center",
                },
              },
            },
          ])
        )
      ),
    },
  ];

  const DownloadExcel = () => (
    <ExcelFile
      element={
        <Button
          onClick={() => {
            console.log(multiDataSet2);
          }}
          disabled={isFetching || isLoading || isError || !res?.data?.length}
          type="primary"
          style={{ marginLeft: 10 }}
        >
          Download Data
        </Button>
      }
      filename={`Data Summary ${moment(queries?.date).format("MM-YYYY")} - ${moment().format(
        "DD-MM-YYYY"
      )}`}
    >
      <ExcelSheet dataSet={multiDataSet} name="Reimbursement Karyawan" />
      <ExcelSheet dataSet={multiDataSet2} name="Rincian" />
    </ExcelFile>
  );

  return {
    column,
    column_expandable,
    queries,
    setQueries,
    data,
    isLoading,
    isFetching,
    refetch,
    totalPages: res?.totalPages,
    DownloadExcel,
  };
};

export default useController;
