import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import moment from "moment";

import { getDataSummary } from "@/services/timesheet";
import { message } from "antd";

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
    {
      title: "Keterangan Tertulis",
      key: "keterangan",
      dataIndex: "keterangan",
    },
  ];

  const data =
    res?.data?.length > 0
      ? res?.data?.map((d, i) => ({
          ...d,
          i,
          ...d.timesheets,
          name: d?.firstName + " " + d?.lastName,
          totalOvertime: d?.timesheets?.totalHours - res?.totalWorkHours,
          keterangan: d?.timesheets?.descriptions?.map((item, index) =>
            item?.description ? (
              <div className="keterangan" key={index}>
                - <b>{moment(item?.date).format("DD MMMM YYYY")}: </b>{" "}
                {item?.description}
              </div>
            ) : (
              <Fragment key={index} />
            )
          ),
        }))
      : [
          {
            i: 0,
            name: "-",
            email: "-",
          },
        ];

  return {
    column,
    data,
    isLoading,
    isFetching,
    refetch,
    res,
    totalPages: res?.data?.totalPages,
  };
};

useController.defaultProps = {
  page: 1,
};

export default useController;
