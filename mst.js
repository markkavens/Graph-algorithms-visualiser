const MAX = 100005;
id = [];
mstPath=[];
nodeMap=[];
sortedWeights=[]

// minimum spanning tree by kruskal algorithm
function initialize()
{
    for(var i = 0;i < MAX;i++)
        id[i] = i;
    var i =0;
    cy.nodes().forEach(node =>{
        nodeMap[node.id()] = i;
        i++;
    });
    sortedWeights = cy.edges().sort(function( a, b ){
        return a.data('weight') - b.data('weight');
      });
}

function root(x)
{
    while(id[x] != x)
    {
        id[x] = id[id[x]];
        x = id[x];
    }
    return x;
}

function union(x,y)
{
    var p = root(x);
    var q = root(y);
    id[p] = id[q];
}

function kruskal()
{
    var x, y;
    var cost, minimumCost = 0;
    sortedWeights.forEach(edge => {
        x = nodeMap[edge.data('source')];
        y = nodeMap[edge.data('target')];
        cost = edge.data('weight');
        // Check if the selected edge is creating a cycle or not
        if(root(x) != root(y))
        {
            minimumCost += cost;
            mstPath.push(edge);
            union(x, y);
        } 
    });
    //console.log(minimumCost);
}

// animation for the mst path we got from
// bfs function
var mstItr = 0;
var mstRun = function(){
    if( mstItr < mstPath.length ){
      mstPath[mstItr]._private.source.addClass('visited');
      mstPath[mstItr]._private.source.addClass('leaving');

      mstPath[mstItr].addClass('visited');
      mstPath[mstItr].addClass('leaving');

      mstPath[mstItr]._private.target.addClass('visited');
      mstPath[mstItr]._private.target.addClass('leaving');
      mstItr++;
      setTimeout(mstRun, 1000);
    }
  };
