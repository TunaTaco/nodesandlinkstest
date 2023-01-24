import {GanttOriginal, Task, ViewMode} from "react-gantt-chart";
import React, {useEffect, useState} from "react";

export interface IBETask {
  NodeId: string,
  StartDate: string,
  EndDate: string,
}

interface Props {
  tasks: IBETask[],
}

const Gant: React.FC<Props> = ({tasks}) => {
  const [mappedTasks, setMappedTasks] = useState<Task[]>([])
  useEffect(() => {
    if (tasks) {
      setMappedTasks(tasks.slice(0,20).map(({NodeId, StartDate, EndDate}) => {
        const StartDateArray = StartDate.split('/')
        const EndDateArray = EndDate.split('/')

        return {
          type: "task",
          id: NodeId,
          name: "Task",
          start: new Date(+StartDateArray[2], +StartDateArray[1] - 1, +StartDateArray[0]),
          end: new Date(+EndDateArray[2], +EndDateArray[1] - 1, +EndDateArray[0]),
          progress: 0,
          dependencies: [],
          project: "Task",
        }
      }))
    }
  }, [tasks, mappedTasks])

  return (
    <div>
      {!!mappedTasks.length &&
          <GanttOriginal
              tasks={mappedTasks}
              viewMode={ViewMode.QuarterDay}
              columnWidth={50}
          />
      }
    </div>

  )
};

export default Gant
