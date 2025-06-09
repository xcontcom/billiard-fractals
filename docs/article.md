# The Billiard Fractals

Complex systems often appear chaotic or incomprehensible, yet closer examination reveals that such complexity can frequently be reduced to a simple underlying mechanism. By systematically removing layers of emergent behavior, one can uncover a fundamental rule or equation from which the entire system originates.

![Picture](images/0.png)

While the system described in this article may appear trivial at first glance, the resulting patterns exhibit quasi-fractal behavior that can be analyzed, encoded, and even predicted through symbolic methods. The work presented here was developed independently through direct observation, rather than derived from prior literature.

A useful way to motivate this exploration is by analogy with a common physical phenomenon - wave interference. Consider waves on the surface of a river: a wavefront moves toward the shore, reflects, and overlaps with itself. Do these reflections contain an underlying order? Is it possible to extract structure from the interference?

To investigate this, we simplify the system. Rather than modeling the full wave, we consider only the motion vector - essentially, a ray. We also smooth the “shoreline” and discretize the environment into a rectangular grid. From this setup emerges the core construction of this article.

<details><summary>:)</summary>
  
---
  
Let me be honest. The line about "watching waves on the surface of a river" - that's just a narrative device. Sure, I've stood by rivers and had deep thoughts (who hasn't?), but that's not where these fractals came from. The real story is different.

As a kid, I had this idea that chaos doesn’t truly exist. When something seems chaotic, it just means you haven’t found the pattern yet. I wanted to prove this to myself - not anyone else - so I began looking for the simplest possible system that could appear chaotic but wasn’t.

What I came up with was this: take a rectangle, send a sine wave from one corner, and let it reflect off the edges. Since a sine wave is nonlinear, it intersects itself in seemingly unpredictable places. I didn’t have the tools to simulate this properly at the time (I was around 14 and hadn’t started programming yet, though I’d read a lot of technical stuff - including GW-BASIC).

So I simplified it further. I replaced the sine wave with a straight line and made it dashed, to preserve periodicity. It turned into something you could draw with pencil and paper - and it still produced fascinating, structured patterns. That’s where all of this started.

---

</details>
