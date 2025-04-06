const Employees = { "title": "Equipe & Colaboradores", "subtitle": "Controle funcionários e permissões", "link": "/employee/management" };
const tasks = { "title": "Tarefas e Designações", "subtitle": "Gerencie e atribua tarefas para funcionários.", "link": "/task/management" };
const MeTasks = { "title": "Acompanhamento de Tarefas", "subtitle": "Consulte o histórico de tarefas", "link": "/task/history" };
const dashboard = { "title": "Análise e Relatórios", "subtitle": "Gere relatórios e Obtenha insights valiosos", "link": "/dashboard" };

//'employee', 'client', 'manager', 'rh', 'support', 'admin'
function getFeatures(role) {
    let features = Set([]);
    // Check the role and add features accordingly
    if (role == 'rh') {
        features.push(Employees, tasks, MeTasks);
    } else if (role == 'manager') {
        features.push(tasks, MeTasks, dashboard);
    }
    else if (role == 'admin') {
        features.push(Employees, tasks, MeTasks, dashboard);
    } else {
        features.push(MeTasks);
    }
    return features;
}

export default getFeatures;