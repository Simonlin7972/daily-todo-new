import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Undo2 } from 'lucide-react';
import { RecapDialog } from './RecapDialog';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  type: 'todo' | 'section';
}

interface CompletedPanelProps {
  completedTodos: Todo[];
  onRestore: (id: number) => void;
  isMobile: boolean;
  targetTasks: number;
  onTargetTasksChange: (value: number) => void;
  onSaveRecap: (recap: string, mood: string) => void;
}

export const CompletedPanel: React.FC<CompletedPanelProps> = ({
  completedTodos,
  onRestore,
  isMobile,
  targetTasks,
  onTargetTasksChange,
  onSaveRecap
}) => {
  const { t } = useTranslation();
  const progressValue = Math.min(completedTodos.length, targetTasks) * (100 / targetTasks);
  const isCompleted = completedTodos.length >= targetTasks;

  return (
    <Card className="w-full lg:max-w-md shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="mb-4">{t('whatIveDoneToday')}</CardTitle>
        <Progress 
          value={progressValue} 
          className={`w-full h-2 mt-2 ${isCompleted ? 'bg-primary' : ''}`} 
        />
        <p className="text-sm text-muted-foreground pt-2 flex items-center justify-center">
          {t('tasksCompleted', { count: completedTodos.length })} / 
          <Select onValueChange={(value) => onTargetTasksChange(Number(value))}>
            <SelectTrigger className="w-[60px] h-6 text-sm ml-1 mr-1">
              <SelectValue placeholder={targetTasks.toString()} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30].map((value) => (
                <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {t('targetTasks')}
        </p>
      </CardHeader>
      <CardContent>
        <Droppable droppableId="completed">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 pl-4">
              {completedTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between p-2 pl-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <Check size={20} className="text-gray-300 mr-2" />
                        <span className="text-sm line-through truncate">{todo.text}</span>
                      </div>
                      {isMobile ? (
                        <Button variant="ghost" size="icon" onClick={() => onRestore(todo.id)}>
                          <Undo2 size={16} />
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => onRestore(todo.id)}>
                              <Undo2 size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t('restore')}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        
        <RecapDialog completedTodos={completedTodos} onSaveRecap={onSaveRecap} />
      </CardContent>
    </Card>
  );
};
