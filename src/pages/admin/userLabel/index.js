import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import CustomButton from "../../../components/customButton";
import EditedUser from "../../../components/editedUser";
import TableData from "../../../components/table";
import TambahUser from "../../../components/tambahUser";
import Title from "../../../components/title";
import services from "../../../process/services";
import atom from "../../../state";
import color from "../../../utility/color";

const UserLabel = () => {
  const handleDelete = (id) => {
    swal({
      title: "Apakah anda yakin ingin menghapus semua data?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        services.deleteUserLabel(id).then((_) => {
          swal("Data berhasil dihapus", {
            icon: "success",
          });
          setCounter(counter + 1);
        });
      }
    });
  };

  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const [data, setData] = useState([]);

  const getBerita = useCallback(async () => {
    const berita = await services.getUserLabel();
    setData(berita.data.data);
  }, []);

  useEffect(() => {
    if (counter >= 0) getBerita();
  }, [counter, getBerita]);

  const columns = [
    {
      dataField: "username",
      text: "username",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "password",
      text: "Password",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "id",
      text: "Action",
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
      formatter: (_, row) => {
        const { id, username, password } = row;
        return (
          <Fragment>
            <div className="mb-1">
              <EditedUser username={username} password={password} id={id} />
            </div>
            <div className="mb-1" onClick={() => handleDelete(id)}>
              <CustomButton
                title="Delete"
                textColor={color.gray}
                bgColor={color.red}
                id={id}
              />
            </div>
          </Fragment>
        );
      },
    },
  ];

  const defaultSortedDataset = [
    {
      dataField: "username",
      order: "asc",
    },
  ];

  return (
    <Container className="mt-3">
      <Title title="User Label" />
      <div className="mt-4" />
      <TambahUser />
      <TableData
        data={data}
        columns={columns}
        defaultSorted={defaultSortedDataset}
      />
    </Container>
  );
};

export default UserLabel;
