import RulesPanel from "./rules-panel"
// import RecentActivity from "./recent-activity"

export default function DashboardSidebar() {
  return (
    <div className="xl:col-span-1 space-y-6">
      <RulesPanel />
      {/* <RecentActivity /> */}
    </div>
  )
}
