dfsPath = [];

function dfs(start) 
{ 
	var visited = []; 
	for (var i = 0; i < cy.nodes().length; i++) 
		visited[i] = false; 
	var vert = cy.getElementById(start);
	DFSUtil(vert, visited); 
} 

function DFSUtil(vert, visited) 
{ 
	visited[vert.id()] = true; 
	dfsPath.push(vert);
	var get_neighbours =  vert.neighbourhood('node');
	get_neighbours.forEach(neighbour => {
		if (!visited[neighbour.id()]) {
			dfsPath.push(neighbour.edgesWith(vert));
			dfsPath.push(neighbour);
			DFSUtil(neighbour, visited); 
		}	
	}); 
}

// animation for the dfs path we got from
// dfs function
var dfsItr = 0;
var dfsRun = function(){
    if( dfsItr < dfsPath.length ){
		dfsPath[dfsItr].addClass('visited');
      	dfsPath[dfsItr].addClass('leaving');
		  dfsItr++;
      setTimeout(dfsRun, 1000);
    }
  };
