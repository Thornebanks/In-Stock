import './PageHeader.scss';
import BackIcon from '../../assets/Icons/arrow_back-24px.svg';

function PageHeader({title, children, goBack, noBorder}) {
  return (
    <section className={!noBorder ? "page-header" : "page-header page-header--no-border"}>
      <div className="page-header-group">
        {
          goBack ? <img className="page-header-group__back" src={BackIcon} onClick={() => goBack.goBack()} alt="blue back arrow"/> : ""
        }
        <h1 className="page-header-group__title">{title}</h1>
      </div>
      {children ? <div className="page-header__children">{children}</div> : "" }
    </section>
  );
}

export default PageHeader;