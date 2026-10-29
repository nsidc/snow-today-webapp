import React, { useState } from 'react';
import TileLayout from './TileLayout';
import ControlPanel, { PanelType } from '@src/components/ControlPanel';

import '@src/style/TabLayout.css';
import InteractivePlotLayout from './InteractivePlotLayout';
import InteractiveMapLayout from './InteractiveMapLayout';

const TAB_LABELS = ['Snow Report', 'Interactive Plots', 'Interactive Map'] as const;

const TabLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    
    return (
        <div className="container-fluid p-0">
            <ul className="nav nav-tabs mb-3" role="tablist">
                {TAB_LABELS.map((label, index) => {
                    const isActive = activeTab === index;
                    return (
                        <li key={label} className="nav-item" role="presentation">
                            <button
                                type="button"
                                role="tab"
                                id={`main-tab-${index}`}
                                aria-selected={isActive}
                                aria-controls={`main-tab-panel-${index}`}
                                onClick={() => setActiveTab(index)}
                                className={`nav-link ${isActive ? 'active fw-bold' : ''}`}
                            >
                                {label}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="tab-content">
                <div role="tabpanel" id="main-tab-panel-0" aria-labelledby="main-tab-0" hidden={activeTab !== 0}>
                    <ControlPanel layoutType={PanelType.TILED} />
                    <TileLayout />
                </div>

                <div role="tabpanel" id="main-tab-panel-1" aria-labelledby="main-tab-1" hidden={activeTab !== 1}>
                    <ControlPanel layoutType={PanelType.PLOT} />
                    <InteractivePlotLayout />
                </div>

                <div role="tabpanel" id="main-tab-panel-2" aria-labelledby="main-tab-2" hidden={activeTab !== 2}>
                    <ControlPanel layoutType={PanelType.MAP} />
                    <InteractiveMapLayout />
                </div>

                
            </div>
        </div>
    )
};

export default TabLayout;