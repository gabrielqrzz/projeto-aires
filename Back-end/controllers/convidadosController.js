import { getAllConvidados, addConvidado } from '../models/convidadosModel.js';

export const listarConvidados = async (req, res) => {
  try {
    const convidados = await getAllConvidados();
    res.json(convidados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar convidados' });
  }
};

export const criarConvidado = async (req, res) => {
  try {
    await addConvidado(req.body);
    res.status(201).json({ message: 'Convidado adicionado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar convidado' });
  }
};
