'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabListClassName?: string;
  tabPanelClassName?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  className,
  tabListClassName,
  tabPanelClassName,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab ?? (tabs[0]?.id ?? ''),
  );

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        className={cn(
          'flex border-b border-border',
          tabListClassName,
        )}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent',
              activeTab === tab.id
                ? 'border-b-2 border-accent text-accent'
                : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className={cn('pt-4', tabPanelClassName)}
      >
        {activeContent}
      </div>
    </div>
  );
}