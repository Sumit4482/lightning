import 'package:flutter/material.dart';

/// Subtle scale + fade on mount; optional stagger delay for lists.
class StaggerScaleIn extends StatefulWidget {
  const StaggerScaleIn({
    super.key,
    required this.child,
    this.delay = Duration.zero,
    this.duration = const Duration(milliseconds: 300),
  });

  final Widget child;
  final Duration delay;
  final Duration duration;

  @override
  State<StaggerScaleIn> createState() => _StaggerScaleInState();
}

class _StaggerScaleInState extends State<StaggerScaleIn>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: widget.duration,
  );

  late final Animation<double> _scale = Tween<double>(begin: 0.95, end: 1).animate(
    CurvedAnimation(parent: _c, curve: Curves.easeOutCubic),
  );

  late final Animation<double> _opacity = Tween<double>(begin: 0, end: 1).animate(
    CurvedAnimation(parent: _c, curve: Curves.easeOut),
  );

  @override
  void initState() {
    super.initState();
    Future<void>.delayed(widget.delay, () {
      if (mounted) {
        _c.forward();
      }
    });
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _opacity,
      child: ScaleTransition(scale: _scale, child: widget.child),
    );
  }
}
