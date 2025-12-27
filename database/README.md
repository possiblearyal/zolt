# Zolt Database

This directory contains the database setup for the Zolt application.

## Technology

*   **Database:** SQLite

## Purpose

The database stores all application data on the user's local machine. This includes:

*   Quiz settings and configurations.
*   Customizable round details.
*   Team and participant information.
*   Scores and results.

A `score-events` table is used to log every scoring action. This creates a transparent record that can be reviewed to resolve any issues or objections.