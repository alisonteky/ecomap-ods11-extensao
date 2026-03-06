const map = L.map('map').setView([-25.5164, -54.5854], 13); // Foz do Iguaçu
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let pontos = JSON.parse(localStorage.getItem('pontos')) || [
  {id:1, nome:"UVR Vila A", tipo:"reciclagem", lat:-25.52, lng:-54.58, desc:"Ponto de reciclagem"},
  {id:2, nome:"Parque do Iguaçu", tipo:"parque", lat:-25.51, lng:-54.59, desc:"Área verde preservada"}
];

function carregarPontos() {
  pontos.forEach(p => {
    const cor = p.tipo === 'problema' ? 'red' : 'green';
    L.marker([p.lat, p.lng], {icon: L.divIcon({className: `marker-${cor}`})})
      .addTo(map).bindPopup(`<b>${p.nome}</b><br>${p.desc}`);
  });
  atualizarLista();
}

document.getElementById('formPonto').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const tipo = document.getElementById('tipo').value;
  const descricao = document.getElementById('descricao').value;

  // Clique no mapa para definir coordenadas (simplificado)
  const lat = -25.5164 + (Math.random() - 0.5) * 0.02;
  const lng = -54.5854 + (Math.random() - 0.5) * 0.02;

  pontos.push({id: Date.now(), nome, tipo, lat, lng, desc: descricao});
  localStorage.setItem('pontos', JSON.stringify(pontos));
  location.reload();
});

function atualizarLista() {
  const lista = document.getElementById('listaPontos');
  lista.innerHTML = pontos.map(p => `<li><strong>${p.nome}</strong> - ${p.desc}</li>`).join('');
}

carregarPontos();