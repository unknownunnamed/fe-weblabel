import React, { useCallback, useEffect, useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import services from "../../process/services";
import atom from "../../state";
import color from "../../utility/color";
import DataNull from "./dataNull";
import NotNull from "./notNull";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("userWebLabel");
    history.push("/login");
  };

  const counter = useRecoilValue(atom.beritaCounter);

  const [data, setData] = useState(null);

  const getBerita = useCallback(async (id) => {
    const berita = await services.getBeritaLabel(id);
    setData(berita.data.data);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userWebLabel") ?? 0;
    console.log(user);
    if (user === 0) {
      history.push("/login");
    }
    if (counter >= 0) getBerita(user);
  }, [counter, getBerita, history]);

  return (
    <Fragment>
      <div
        className="py-3 mb-2 shadow"
        style={{
          backgroundColor: color.white,
          color: color.black,
          textAlign: "right",
        }}
      >
        <div className="container">
          <span
            onClick={() => handleLogout()}
            className="pt-1 pb-2 px-4"
            style={{
              cursor: "pointer",
              borderRadius: 30,
              backgroundColor: color.red,
              color: color.white,
            }}
          >
            Keluar
          </span>
        </div>
      </div>
      {data ? <NotNull data={data} /> : <DataNull />}
    </Fragment>
  );
};

export default Home;
