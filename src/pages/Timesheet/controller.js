import { useEffect, useState } from "react";
import moment from "moment";
import { message } from "antd";
import { useQuery, useMutation } from "react-query";

import { getProject } from "@/services/project";
import { getWorkLocation } from "@/services/workLocation";
import { addTimesheet, getTimesheet, removeTimesheet } from "@/services/timesheet";

const useController = () => {
  const [date, setDate] = useState({
    custom: false,
    year: moment().format("YYYY"),
    month: moment().format("M"),
  });
  const [modal, setModal] = useState({ visible: false, date: null });
  const dateFormat = date?.year + "-" + date?.month;

  const { data: companyList } = useQuery("projectAll", () => getProject()),
    { data: workLocationList } = useQuery("workLocationsAll", () => getWorkLocation());

  const {
    data: timesheet,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(["timesheet", { date: dateFormat }], () => getTimesheet({ date: dateFormat }));

  const add = useMutation(
    (values) => {
      return addTimesheet(values);
    },
    {
      onSuccess: () => {
        message.success("Timesheet Saved Successfully");
        setModal({ ...modal, visible: false });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Add Timesheet Failed");
      },
    }
  );

  const remove = useMutation(
    (id) => {
      return removeTimesheet(id);
    },
    {
      onSuccess: () => {
        message.success("Timesheet Removed Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Remove Timesheet Failed");
      },
    }
  );

  const onFinish = (values) => {
    console.log(values);
    add.mutate(values);
  };

  const onRemove = (id) => {
    if (!id) return;
    remove.mutate(id);
  };

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error]);

  useEffect(() => {
    if (isLoading || isFetching) return;

    message.loading({
      content: "Loading...",
      duration: 0.5,
      key: "loadingTimesheet",
    });
  }, [isLoading, isFetching]);

  return {
    date,
    setDate,
    modal,
    setModal,
    dateFormat,
    timesheet,
    companyList,
    workLocationList,
    onFinish,
    onRemove,
  };
};

export default useController;
