import { Outlet } from "react-router-dom";

function ViewBase() {
  return (
    <>
      <h1>在庫一覧</h1>
      <Outlet />
    </>
  );
}

export default ViewBase;