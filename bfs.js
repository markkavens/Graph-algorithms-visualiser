bfsPath = []
function bfs(start) 
{ 
	var startNode = cy.getElementById(start);
	//console.log(startNode);
	// create a visited array 
	var visited = []; 
	for (var i = 0; i < cy.nodes().length; i++) 
		visited[i] = false; 

	// Create queue 
	var q = []; 

	// add the starting node to the queue 
	visited[startNode.id()] = true; 
    q.push(startNode); 
    bfsPath.push(startNode);

	while (q.length > 0) { 
		// get the element from the queue 
		var vert = q.shift(); 
		// get the adjacent list for current vertex 
		var getNeighbours = vert.neighbourhood('node'); 

		//add the neighbours to the queue if not processed  
        getNeighbours.forEach(neighbour => {
            if (!visited[neighbour.id()]) { 
                visited[neighbour.id()] = true;
                bfsPath.push(neighbour.edgesWith(vert));    // storing edge in path array
                bfsPath.push(neighbour);                    // storing node in path array
				q.push(neighbour); 
			}  
        }); 
	} 
}

// animation for the bfs path we got from
// bfs function
var bfsItr=0;
var bfsRun = function(){
    if( bfsItr < bfsPath.length ){
      bfsPath[bfsItr].addClass('visited');
      bfsPath[bfsItr].addClass('leaving');
      bfsItr++;
      setTimeout(bfsRun, 1000);
    }
  };
