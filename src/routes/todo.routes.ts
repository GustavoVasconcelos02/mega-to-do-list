// src/routes/todo.routes.ts
import { Router, Request, Response } from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../repositories/task_repository';
import { CreateTaskDTO } from '../models/task_model';

const router = Router();

// rota de criação de tarefas

router.post('/tasks', async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, completed, user_id } = req.body;

    if (!title || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Título e status são obrigatórios' });
    }

    const newTask = await createTask({ title, description, completed, user_id });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

//obter tarerfa pelo Id

router.get('/tasks/:id', async (req: Request, res: Response):  Promise<any>  => {
  try {
    const taskID = req.params.id;
    const task = await getTaskById(taskID)

    if(!task){
      return res.status(404).json({error: "Tarefa não encontrada"});
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error)
    res.status(500).json({error: "Erro ao buscar tarefa"})
  }
})

//atualiza uma tarefa

router.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;  // ID da tarefa
    const { title, description, completed, user_id } = req.body;

    // Dados para atualizar
    const updatedData: Partial<CreateTaskDTO> = { title, description, completed, user_id };

    // Atualizando a tarefa
    const updatedTask = await updateTask(taskId, updatedData);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

//deletar uma tarefa

router.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskID = req.params.id;

    const deletedTask = await deleteTask(taskID);

    res.status(200).json(deletedTask)
  } catch (error) {
    console.error("Erro aodeletar tarefa:", error);
    res.status(500).json({error: "Erro ao deletar tarefa"})
  }
});

//obter todas as tarefas

router.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({error:"Erro ao buscar tarefas"})
  }
});

export default router;
