export default function animate(renderer, stage) {
  requestAnimationFrame(animate.bind(null, renderer, stage));

  // render the root container
  renderer.render(stage);
}
