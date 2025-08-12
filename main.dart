import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:project/common/widget.dart';
import 'package:project/goals_folder/goals_screen.dart';
import 'package:project/graph_folder/graph_screen.dart';
import 'package:project/intake_folder/intake_screen.dart';
import 'package:project/profile_folder/profile_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}