import style from "./style.module.css";

const Loader = () => {
  return (
    <div className={style.Loader__Container}>
      <div className={style.Loader}></div>
    </div>
  );
};

export default Loader;
