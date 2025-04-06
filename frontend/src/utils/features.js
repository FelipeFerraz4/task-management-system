const Employees = { "title": "Equipe & Colaboradores", "subtitle": "Controle funcionários e permissões", "link": "/employee/management" };
const tasks = { "title": "Tarefas e Designações", "subtitle": "Gerencie e atribua tarefas para funcionários.", "link": "/task/management" };
const MeTasks = { "title": "Acompanhamento de Tarefas", "subtitle": "Consulte o histórico de suas tarefas", "link": "/task/metasks" };
const dashboard = { "title": "Análise e Relatórios", "subtitle": "Gere relatórios e Obtenha insights valiosos", "link": "/dashboard" };

//'employee', 'client', 'manager', 'rh', 'support', 'admin'
function getFeatures(role) {
  const features = new Set();

  if (role === "rh") {
    features.add(Employees).add(tasks).add(MeTasks);
  } else if (role === "manager") {
    features.add(tasks).add(MeTasks).add(dashboard);
  } else if (role === "admin") {
    features.add(Employees).add(tasks).add(MeTasks).add(dashboard);
  } else {
    features.add(MeTasks);
  }

  return Array.from(features); // Transforma o Set em array
}


export default getFeatures;