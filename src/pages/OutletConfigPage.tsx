import { useState } from "react";

import "./OutletConfigPage.css";

const TABS = [
  "Store Directory",
  "Operating Hours",
  "Outlet News",
  "Service Catalogue",
  "Third-Party Services",
  "Accessibility Guide",
];

export function OutletConfigPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="page">
      <p className="page__breadcrumb">Dashboard &gt; Outlet Configuration</p>

      <div className="page__topRow">
        <h1 className="page__title">OUTLET CONFIGURATION</h1>
        <div className="page__topActions">
          <span className="page__updated">Last updated: 2 hours ago</span>
          <button type="button" className="btn btn--ghost">
            EXPORT
          </button>
          <button type="button" className="btn btn--primary">
            ADD NEW STORE
          </button>
        </div>
      </div>

      <div className="page__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === activeTab ? "tab tab--active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* The data table is intentionally left out for now. */}
      <div className="page__tablePlaceholder">
        <div className="page__placeholderInner">
          <h3>{activeTab}</h3>
          <p>
            Table area reserved — the data grid for this section will be built
            here in a later step.
          </p>
        </div>
      </div>
    </div>
  );
}
