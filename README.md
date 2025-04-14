# Pathfinding Visualizer 🧭

An interactive visualizer for classic pathfinding algorithms like A*, Dijkstra, BFS, and DFS — built using HTML, CSS, and JavaScript.

## 🔍 Features

- Visualize A*, Dijkstra, BFS, and DFS algorithms.
- Create walls and weighted cells.
- Adjustable animation speed.
- Real-time path cost and visited node count.
- Clean, responsive UI.

## 🚀 Getting Started

 1. Clone the repository
```bash
git clone https://github.com/your-username/PathCraft.git
cd PathCraft

 2. Open in browser
You can simply open index.html in any modern browser:
  open index.html  # macOS
  start index.html # Windows

🧠 Algorithms Supported
Algorithm	Description
A* :	Uses heuristics for efficient shortest path finding
Dijkstra :	Uniform cost search, guarantees shortest path
BFS :	Explores neighbors first, may not give optimal path in weighted graphs
DFS :	Explores deep before broad, not optimal but fast

🎮 How to Use
1.Select an algorithm from the dropdown.
2.Adjust speed of visualization using the slider.
3.Click on cells to:
  * First click → Set Start point (green)
  * Second click → Set End point (red)
  * Further clicks → Add Walls or Weighted Cells
4.Check the box to toggle between Wall and Weighted Cell mode.
5.Click "Start" to visualize the algorithm.
6.Click "Reset" to clear the grid and start over.

🧱 Tech Stack
HTML – Structure

CSS – Styling the grid and interface

JavaScript – Logic for visualization and algorithms

📷 Preview
![image](https://github.com/user-attachments/assets/9dba28b7-7986-47bf-8517-bddd08028478)

📂 File Structure
bash
Copy code
PathCraft/
│
├── index.html       # Main UI
├── style.css        # Styling
└── script.js        # Algorithms and interactivity

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

📄 License
MIT

Happy pathfinding! 🚀
