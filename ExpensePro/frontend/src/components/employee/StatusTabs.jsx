export default function StatusTabs({

    activeTab,

    setActiveTab

}) {

    const tabs = [

        "all",

        "pending",

        "approved",

        "rejected"

    ];

    return (

        <div className="status-tabs">

            {

                tabs.map(tab => (

                    <button

                        key={tab}

                        className={
                            activeTab === tab
                                ? "tab active-tab"
                                : "tab"
                        }

                        onClick={() =>

                            setActiveTab(tab)

                        }

                    >

                        {

                            tab.charAt(0).toUpperCase()

                            +

                            tab.slice(1)

                        }

                    </button>

                ))

            }

        </div>

    );

}