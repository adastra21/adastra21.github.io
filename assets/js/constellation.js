(function () {
  var canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 130;
  var LINE_DISTANCE = 120;
  var raf;

  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    var dot = style.getPropertyValue('--canvas-dot').trim() || 'rgba(255,255,255,0.35)';
    var lineRgb = style.getPropertyValue('--canvas-line-rgb').trim() || '255,255,255';
    var lineMax = parseFloat(style.getPropertyValue('--canvas-line-max').trim()) || 0.07;
    return { dot: dot, lineRgb: lineRgb, lineMax: lineMax };
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function draw() {
    var colors = getThemeColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINE_DISTANCE) {
          var opacity = colors.lineMax * (1 - dist / LINE_DISTANCE);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(' + colors.lineRgb + ', ' + opacity + ')';
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.dot;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    }

    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();
