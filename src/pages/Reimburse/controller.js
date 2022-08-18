import { useEffect, useState } from "react";
import moment from "moment";
import { useQuery, useMutation } from "react-query";
import { getReimburse, removeReimburse, addReimburse } from "@/services/reimburse";

import Icon from "@/helpers/Icon";
import { Button, Image, message, Popconfirm, Row, Tooltip } from "antd";
import { updateReimburse } from "../../services/reimburse";

const useController = () => {
  const [modal, setModal] = useState({
      initialValues: {},
      title: "Buat Laporan Reimburse",
      visible: false,
    }),
    [queries, setQuery] = useState({
      page: 1,
      limit: 10,
    }),
    setQueries = (params) => setQuery({ ...queries, ...params });

  const {
    data: res,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(["reimburse", queries], () => getReimburse(queries));

  const add = useMutation(
    (values) => {
      return addReimburse(values);
    },
    {
      onSuccess: () => {
        message.success("Reimburse Added Successfully");
        setModal({ visible: false });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Add Reimburse Failed");
      },
    }
  );

  const update = useMutation(
    (values) => {
      return updateReimburse(values);
    },
    {
      onSuccess: () => {
        message.success("Reimburse Updated Successfully");
        setModal({ visible: false });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Update Reimburse Failed");
      },
    }
  );

  const remove = useMutation(
    (id) => {
      return removeReimburse(id);
    },
    {
      onSuccess: () => {
        message.success("Reimburse Deleted Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Delete Failed");
      },
    }
  );

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error, res]);

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
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: "100pt",
      render: (value) => (!value ? "-" : moment(value).format("DD-MM-YYYY")),
    },
    {
      title: "Reimburse",
      key: "value",
      dataIndex: "value",
      render: (value) => (value ? `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-"),
      width: "140pt",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (value) => value || "-",
      width: "200pt",
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
      title: "Action",
      key: "action",
      dataIndex: "action",
      align: "center",
      width: "100pt",
    },
  ];

  const data =
    res?.data?.length > 0
      ? res?.data?.map((d, i) => ({
          ...d,
          i,
          key: i,
          action: (
            <Row key={i} justify="center">
              <Tooltip placement="topLeft" title="Edit">
                <Button
                  className="button-action"
                  type="danger"
                  onClick={() =>
                    setModal({
                      initialValues: d,
                      title: "Update Reimburse",
                      visible: true,
                    })
                  }
                  ghost
                >
                  <Icon type="EditFilled" />
                </Button>
              </Tooltip>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => remove.mutate(d?.id)}
              >
                <Tooltip placement="topLeft" title="Remove">
                  <Button className="button-action" type="danger">
                    <Icon type="DeleteFilled" />
                  </Button>
                </Tooltip>
              </Popconfirm>
            </Row>
          ),
        }))
      : [
          {
            i: 0,
            key: 0,
            name: "-",
            description: "-",
            action: "-",
          },
        ];

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values?.id) update.mutate(values);
    else add.mutate(values);
  };

  return {
    column,
    data,
    isLoading,
    onFinish,
    queries,
    add,
    update,
    setQueries,
    modal,
    setModal,
    totalPages: res?.totalPages,
  };
};

export default useController;
