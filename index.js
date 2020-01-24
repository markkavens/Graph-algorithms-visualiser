var cy ;
var nodesOfVertices=0;
cy= cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: true,
    zoomingEnabled:false,
    style: cytoscape.stylesheet()
      .selector('node')
        .style({
          'content': 'data(id)'
        })
      .selector('edge')
        .style({
          'content': 'data(weight)',
          'curve-style': 'bezier',
          'width': 4,
          'line-color': '#ddd',
          'target-arrow-color': '#ddd'
        })
      .selector('.visited')
        .style({
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        })
      .selector('.leaving')
        .style({
          'background-color': '#00cc00',
          'line-color': '#00cc00',
          'target-arrow-color': '#00cc00',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }),
  
    elements: {
        nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          { data: { id: 'c' } },
          { data: { id: 'd' } },
          { data: { id: 'e' } }
        ],
        edges: [
          { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
          { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
          { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
          { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
          { data: { id: 'ca', weight: 6, source: 'c', target: 'a' } },
          { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
          { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
        ]
      },
      layout : {
        name: "circle"
      }
  });
  
  function reset(){
    cy.elements().remove();
    nodesOfVertices=0;
    dfsPath = [];
    bfsPath =[];
    bfsItr=0;
    dfsItr=0;
    mstItr=0;
    document.getElementById('cy').removeEventListener("click",addNode);
  }

  function customGraph(){
    document.getElementById('cy').addEventListener("click",addNode);
  }

  function addNode(event){
    var xcor = event.clientX;
    var ycor = event.clientY;
    console.log(xcor,ycor);
    cy.add({
        group: 'nodes',
        data: { id: nodesOfVertices },
        position: { x: xcor, y: ycor }
    });
    nodesOfVertices++;

  }

  function addEdge(){
    var weightField = document.getElementById('Weight');
    var fromField = document.getElementById('From-Node');
    var toField = document.getElementById('To-Node');

    weightE = weightField.value;
    fromE = fromField.value;
    toE = toField.value;

    if(weightE=='' || fromE=='' ||toE=='')
    {
        alert("Empty field not allowed");
        return;
    }
    cy.add({
      group: 'edges',
      data: { id: fromE+toE , weight: weightE, source: fromE, target: toE } 
    });
  
  }

function run(){
  var start = document.getElementById('startnode').value;
  document.getElementById('cy').removeEventListener("click",addNode);
  dfsPath = [];
  bfsPath =[];
  bfsItr=0;
  dfsItr=0;
  mstItr=0;
  dfs(start);
  bfs(start);
  resetStyles();
}

function resetStyles(){
  cy.nodes().forEach(node =>{
    node.removeClass('visited');
    node.removeClass('leaving');
  });

  cy.edges().forEach(edge =>{
    edge.removeClass('visited');
    edge.removeClass('leaving');
  })
}

document.getElementById('DFS').addEventListener('click',() =>{
  run();
  dfsRun();
});
document.getElementById('BFS').addEventListener('click',() =>{
  run();
  bfsRun();
});
document.getElementById('MST').addEventListener('click',() =>{
  run();
  id = [];
  mstPath=[];
  nodeMap=[];
  sortedWeights=[];
  
  initialize();
  kruskal();
  mstRun();
});