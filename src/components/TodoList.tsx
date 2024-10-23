import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Edit2, Check, Plus, Undo2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import './TodoList.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  type: 'todo' | 'section';
}

const CompletedPanel: React.FC<{
  completedTodos: Todo[];
  onRestore: (id: number) => void;
}> = ({ completedTodos, onRestore }) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>What I've done</CardTitle>
    </CardHeader>
    <CardContent>
      <Droppable droppableId="completed">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {completedTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between p-2 rounded-md border bg-card text-card-foreground shadow-sm"
                  >
                    <span className="text-sm line-through truncate mr-2">{todo.text}</span>
                    <Button variant="ghost" size="icon" onClick={() => onRestore(todo.id)}>
                      <Undo2 size={16} />
                    </Button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </CardContent>
  </Card>
);

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const [titleText, setTitleText] = useState('');
  const fullTitle = "What do you want to get done today?";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTitleText(fullTitle.slice(0, index));
      index++;
      if (index > fullTitle.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the speed of typing here

    return () => clearInterval(intervalId);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, type: 'todo' }]);
      setNewTodo('');
    }
  };

  const addSection = (index: number) => {
    const newSection: Todo = { id: Date.now(), text: 'New Section', completed: false, type: 'section' };
    const updatedTodos = [...todos];
    updatedTodos.splice(index + 1, 0, newSection);
    setTodos(updatedTodos);
    startEditing(newSection.id, newSection.text);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      addTodo();
    }
  };

  const toggleTodo = (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (todoToToggle) {
      if (!todoToToggle.completed) {
        setCompletedTodos([...completedTodos, { ...todoToToggle, completed: true }]);
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      }
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // 在同一列表內移動
      const items = Array.from(source.droppableId === 'todos' ? todos : completedTodos);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === 'todos') {
        setTodos(items);
      } else {
        setCompletedTodos(items);
      }
    } else {
      // 在列表之間移動
      const sourceItems = Array.from(source.droppableId === 'todos' ? todos : completedTodos);
      const destItems = Array.from(destination.droppableId === 'todos' ? todos : completedTodos);
      const [movedItem] = sourceItems.splice(source.index, 1);

      if (destination.droppableId === 'completed') {
        movedItem.completed = true;
      } else {
        movedItem.completed = false;
      }

      destItems.splice(destination.index, 0, movedItem);

      if (source.droppableId === 'todos') {
        setTodos(sourceItems);
        setCompletedTodos(destItems);
      } else {
        setCompletedTodos(sourceItems);
        setTodos(destItems);
      }
    }
  };

  const restoreTodo = (id: number) => {
    const todoToRestore = completedTodos.find(todo => todo.id === id);
    if (todoToRestore) {
      setTodos([...todos, { ...todoToRestore, completed: false }]);
      setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
    }
  };

  return (
    <TooltipProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center space-x-4 w-full max-w-5xl mx-auto">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle className="typewriter-title">
                {titleText}<span className="caret"></span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new todo"
                />
                <Button onClick={addTodo} disabled={newTodo.trim() === ''}>Add</Button>
              </div>
              <Droppable droppableId="todos">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {todos.map((todo, index) => (
                      <React.Fragment key={todo.id}>
                        <Draggable draggableId={todo.id.toString()} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center group"
                            >
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span 
                                    {...provided.dragHandleProps} 
                                    className="mr-2 cursor-move text-gray-300 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                                  >
                                    <GripVertical size={20} />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Drag to reorder</p>
                                </TooltipContent>
                              </Tooltip>
                              <div className={`flex items-center justify-between p-2 rounded-md border bg-card text-card-foreground shadow-sm flex-grow ${todo.type === 'section' ? 'bg-secondary' : ''}`}>
                                <div className="flex items-center flex-grow">
                                  {todo.type === 'todo' && (
                                    <Checkbox
                                      checked={todo.completed}
                                      onCheckedChange={() => toggleTodo(todo.id)}
                                      className="mr-3 ml-3"
                                    />
                                  )}
                                  {editingId === todo.id ? (
                                    <Input
                                      value={editText}
                                      onChange={(e) => setEditText(e.target.value)}
                                      className="flex-grow mr-2"
                                    />
                                  ) : (
                                    <span className={`${todo.completed ? 'line-through text-muted-foreground' : ''} text-sm flex-grow text-left ${todo.type === 'section' ? 'font-bold' : ''}`}>{todo.text}</span>
                                  )}
                                </div>
                                <div className="flex space-x-1 ml-2">
                                  {editingId === todo.id ? (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => saveEdit(todo.id)}>
                                          <Check size={16} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Save</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => startEditing(todo.id, todo.text)}>
                                          <Edit2 size={16} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Edit</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                                        <Trash2 size={16} />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                        {hoveringIndex === index && (
                          <div 
                            className="h-8 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md my-1 cursor-pointer"
                            onClick={() => addSection(index)}
                            onMouseLeave={() => setHoveringIndex(null)}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Plus size={16} className="mr-1" /> Add Section
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add a new section</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </CardContent>
          </Card>
          {completedTodos.length > 0 && (
            <CompletedPanel completedTodos={completedTodos} onRestore={restoreTodo} />
          )}
        </div>
      </DragDropContext>
    </TooltipProvider>
  );
}
