# The Billiard Fractals

Complex systems often appear chaotic or incomprehensible, yet closer examination reveals that such complexity can frequently be reduced to a simple underlying mechanism. By systematically removing layers of emergent behavior, one can uncover a fundamental rule or equation from which the entire system originates.

![Picture](images/0.png)

While the system described in this article may appear trivial at first glance, the resulting patterns exhibit quasi-fractal behavior that can be analyzed, encoded, and even predicted through symbolic methods. The work presented here was developed independently through direct observation, rather than derived from prior literature.

A useful way to motivate this exploration is by analogy with a common physical phenomenon - wave interference. Consider waves on the surface of a river: a wavefront moves toward the shore, reflects, and overlaps with itself. Do these reflections contain an underlying order? Is it possible to extract structure from the interference?

To investigate this, we simplify the system. Rather than modeling the full wave, we consider only the motion vector - essentially, a ray. We also smooth the “shoreline” and discretize the environment into a rectangular grid. From this setup emerges the core construction of this article.

<details><summary>:)</summary>

---

The example of waves on the surface of a river serves as a real, intuitive starting point - an accessible physical system that demonstrates how simple rules, such as reflection and interference, can produce complex behavior. It illustrates the central idea: that what appears chaotic often emerges from deterministic structure.

The initial motivation was driven by the conviction that apparent disorder is not randomness, but the result of unresolved or hidden structure. Any system that seems chaotic is governed by rules - its complexity a consequence of perspective, not unpredictability.

To explore this further, attention turned to constructing the simplest possible system that could look chaotic yet remain fully deterministic.

One such system involved a sine wave originating from the corner of a rectangle and reflecting off its boundaries. The nonlinearity of the sine function causes it to intersect itself in complex and unintuitive ways. However, due to limited tools available at the time, the model was simplified even further.

Instead of a sine wave, a straight line was used. The line was made periodic (dashed), and the system was designed to be reproducible using only a pencil and a sheet of graph paper. Despite its simplicity, this construction revealed intricate and structured patterns—forming the foundation of what would later be described as the “billiard fractals.”

---

</details>
