import style from "./style.module.css";

const JobCard = ({ company, position, status }) => {
  const statusClassName = `${style.Status} ${style[status]}`;
  return (
    <div className={style.JobCard}>
      <p className={style.CompanyName}>{company.toUpperCase()}</p>
      <p className={style.Position}>{position}</p>

      <div className={style.JobAction}>
        <span className={statusClassName}>{status}</span>
        <button className="button">Apply</button>
      </div>
    </div>
  );
};

export default JobCard;
