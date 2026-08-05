import "./OutletConfigPage.css";

type Props = {
  title: string;
};

export function PlaceholderPage({ title }: Props) {
  return (
    <div className="page">
      <p className="page__breadcrumb">Dashboard &gt; {title}</p>

      <div className="page__topRow">
        <h1 className="page__title">{title.toUpperCase()}</h1>
      </div>

      <div className="page__tablePlaceholder">
        <div className="page__placeholderInner">
          <h3>{title}</h3>
          <p>This section will be built out next.</p>
        </div>
      </div>
    </div>
  );
}
