import { useEffect } from "react";
import { useQuery } from "react-query";
import moment from "moment";

import { getDataSummary } from "@/services/timesheet";
import { message, Button } from "antd";

import ReactExport from "react-data-export";

const { ExcelFile } = ReactExport,
  { ExcelSheet } = ExcelFile;

const useController = ({ queries }) => {
  const {
    data: res,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(["dataSummaryAll", queries], () => getDataSummary(queries));

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error]);

  const column = [
    {
      title: "#",
      key: "i",
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
      title: "Keterangan",
      align: "center",
      children: [
        {
          title: "Hadir",
          key: "hadir",
          dataIndex: "hadir",
          align: "center",
        },
        {
          title: "Izin",
          key: "izin",
          dataIndex: "izin",
          align: "center",
        },
        {
          title: "Sakit",
          key: "sakit",
          dataIndex: "sakit",
          align: "center",
        },
        {
          title: "Cuti",
          key: "cuti",
          dataIndex: "cuti",
          align: "center",
        },
      ],
    },
    {
      title: "Jam Kerja",
      align: "center",
      children: [
        {
          title: "Total",
          key: "totalHours",
          dataIndex: "totalHours",
          align: "center",
        },
        {
          title: "Overtime",
          key: "totalOvertime",
          dataIndex: "totalOvertime",
          align: "center",
        },
      ],
    },
    // {
    //   title: "Keterangan Tertulis",
    //   key: "keterangan",
    //   dataIndex: "keterangan",
    // },
  ];

  const data =
    res?.data?.length > 0
      ? res?.data?.map((d, i) => ({
          ...d,
          key: i,
          i,
          ...d.timesheets,
          name: d?.firstName + " " + d?.lastName,
          totalOvertime: d?.timesheets?.totalHours - res?.totalWorkHours,
          // keterangan: d?.timesheets?.descriptions?.map((item, index) =>
          //   item?.description ? (
          //     <div className="keterangan" key={index}>
          //       - <b>{moment(item?.date).format("DD MMMM YYYY")}: </b>{" "}
          //       {item?.description}
          //     </div>
          //   ) : (
          //     <Fragment key={index} />
          //   )
          // ),
        }))
      : [
          {
            key: 0,
            i: 0,
            name: "-",
            email: "-",
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
        }, //char width
        { title: "Role", width: { wch: 20 } },
        {
          title: "Hadir",
          width: { wch: 7 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          title: "Cuti",
          width: { wch: 6 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          title: "Izin",
          width: { wch: 6 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          title: "Sakit",
          width: { wch: 7 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          title: "Total Jam Kerja",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          title: "Total Overtime",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          title: "Alokasi Tempat Kerja",
          width: { wch: 40 },
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
          value: d.hadir,
          style: {
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          value: d.cuti,
          style: {
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          value: d.izin,
          style: {
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          value: d.sakit,
          style: {
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          value: d.totalHours,
          style: {
            alignment: { vertical: "center", horizontal: "center" },
          },
        },
        {
          value: `${d.totalOvertime}`,
          style: {
            alignment: {
              vertical: "center",
              horizontal: "center",
            },
          },
        },
        {
          value:
            d?.timesheets?.workLocations
              .map((item, i) => `- ${item?.name}: ${item?.workHours || 0} Jam`)
              .join("\n") || "Tidak ada alokasi tempat kerja",
          style: {
            alignment: {
              vertical: "center",
              wrapText: true,
            },
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
          title: "Nama",
          width: { wch: 24 },
        }, //char width
        { title: "Role", width: { wch: 20 } },
        {
          title: "Keterangan",
          width: { wch: 40 },
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
          value:
            d?.timesheets?.descriptions
              .map(
                (item, i) =>
                  `- ${moment(item?.date).format("DD MMMM YYYY")}: ${
                    item?.description
                  }`
              )
              .join("\n") || "Tidak ada keterangan",
          style: {
            alignment: {
              vertical: "center",
              wrapText: true,
            },
          },
        },
      ]),
    },
  ];

  const DownloadExcel = () => (
    <ExcelFile
      element={
        <Button
          disabled={isFetching || isLoading || isError || !res?.data?.length}
          type="primary"
          style={{ marginLeft: 10 }}
        >
          Download Data
        </Button>
      }
      filename={`Data Summary ${moment(queries?.date).format(
        "MM-YYYY"
      )} - ${moment().format("DD-MM-YYYY")}`}
    >
      <ExcelSheet dataSet={multiDataSet} name="Timesheet" />
      <ExcelSheet dataSet={multiDataSet2} name="Keterangan" />
    </ExcelFile>
  );

  return {
    column,
    data,
    isLoading,
    isFetching,
    refetch,
    res,
    totalPages: res?.data?.totalPages,
    DownloadExcel,
  };
};

useController.defaultProps = {
  page: 1,
};

export default useController;
