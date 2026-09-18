---
title: "Why I Built Reverie: The 5 Focus Problems Standard Timers Couldn't Solve"
slug: "how-i-built-reverie"
aliases:
  - "building-reverie-pomodoro-desktop-architecture"
  - "reverie"
date: "2026-09-01"
author: "Sabry Belal"
readingTime: "7 min read"
category: "Focus & Productivity"
tags:
  - "Deep Work"
  - "Reverie"
  - "Productivity"
  - "Focus"
  - "Design"
featured: true
summary: "Traditional timers broke my focus instead of saving it. Here is the honest story of why I built Reverie, how features like Overtime Flow, the Taskbar Mini-Widget, and Distraction Dump Pad solved my deep work struggles, and why I refuse to pay monthly rent for desktop tools."
description: "Traditional timers broke my focus instead of saving it. Here is the honest story of why I built Reverie, how features like Overtime Flow, the Taskbar Mini-Widget, and Distraction Dump Pad solved my deep work struggles, and why I refuse to pay monthly rent for desktop tools."
---

For years, I struggled with staying in deep focus while programming and designing. 

Like millions of knowledge workers, I turned to the classic **Pomodoro Technique**. On paper, it sounds foolproof: work for 25 minutes, take a 5-minute break, repeat four times. But in real life, every single timer app I downloaded felt like an adversary rather than an ally. 

Instead of helping me concentrate, they constantly broke my train of thought, nagged me with shrill alarms, cluttered my screen, or demanded an absurd **\$12/month cloud subscription** just to count seconds down.

I didn't build **Reverie** because the world needed another generic timer. I built it because I was desperately frustrated by 5 specific problems in my own daily workflow that no existing app solved.

---

## Problem 1: The 25-Minute Alarm Ruined My Deep Work Just as I Hit "Flow"

If you write code, write essays, or design interfaces, you know that entering deep flow takes at least 15 to 20 minutes. Just as you hold complex mental architecture in your head, a standard Pomodoro timer screams at you: **STOP WORKING. TIME FOR A BREAK.**

Traditional timers punish you for being productive. If you obeyed the alarm, you severed your mental momentum. If you ignored it, the timer sat stopped and became useless.

### How Reverie Solved It: Gentle Overtime Flow (+MM:SS)

In Reverie, when your focus session hits zero, there is no jarring, panic-inducing buzzer. Instead, the timer transitions softly into **Flow Extension**:

- It displays a calm, non-intrusive status: `+02:45 IN FLOW`.
- It begins counting *up*, letting you wrap up your sentence, commit your code branch, or finish your thought with complete peace of mind.
- When you are genuinely ready to step away, you tap spacebar, and Reverie seamlessly begins your rest interval.

This single feature alone removed all timer-induced anxiety from my workdays.

---

## Problem 2: Alt-Tabbing to Check the Clock Derailed My Concentration

Every time I wondered, *"How much time do I have left?"*, I had to press `Alt+Tab` away from my code editor to find the timer window or squint at a browser tab buried among 40 other open tabs.

That tiny glance was fatal. While looking for the timer, I would notice an unread notification badge, get pulled into an email, and lose 30 minutes of deep focus before writing a single line of code.

### How Reverie Solved It: The Taskbar-Docked Mini-Widget

I built a compact, frameless pill widget that docks directly onto the Windows taskbar:

- It sits silently right next to your pinned apps without taking any desktop screen real estate.
- It features an antialiased SVG perimeter ring that depletes clockwise. With a half-second peripheral glance, you know exactly how much time remains without ever leaving your IDE.
- It never steals window focus, never interrupts typing, and can be toggled or paused with a single click.

---

## Problem 3: Random Intrusive Thoughts Killed My Momentum

You are in the middle of writing a tricky algorithm when your brain suddenly fires: *"Did I pay the hosting invoice?"* or *"Look up that new vector graphic library."*

Psychologists call these **intrusive task intrusions**. If you open your browser to check, you fall down an algorithmic rabbit hole. But if you try to forcefully suppress the thought, your working memory stays clogged trying to remember it.

### How Reverie Solved It: Distraction Dump Pad (`Ctrl+D`)

Whenever a distracting thought pops into my head, I hit `Ctrl+D`:

- A minimal, distraction-free capture box appears instantly on top of my screen.
- I type the thought (e.g. `check AWS invoice`) and hit `Enter`.
- The thought is safely captured in my local daily backlog, the modal vanishes, and my brain can immediately return to writing code.
- At the end of the day, I review the backlog and either cross items off or promote them to tomorrow's priority list.

---

## Problem 4: Music Playlists Were a Constant Distraction Trap

To drown out background chatter and stay focused, I used to put on Spotify or YouTube music. But Spotify is engineered for consumption, not focus:
- Songs have vocals that fight for your linguistic processing bandwidth.
- Tracks end, forcing you to pick another playlist.
- Mid-roll audio ads shatter your concentration.

### How Reverie Solved It: Built-in 40Hz Gamma & Brownian Noise

Neuroscience research shows that **40Hz Gamma binaural waves** stimulate cognitive synchronization, while continuous low-frequency **Brownian noise** masks environmental distractions far better than harsh white noise.

Reverie includes an integrated psychoacoustic sound generator built right into the app:
- It generates continuous, non-repeating Brownian and Gamma soundscapes offline on your device.
- It starts automatically when a work sprint begins, fades out gently when your break starts, and never plays an ad or requires a streaming subscription.

---

## Problem 5: Paying \$120/Year for a Timer App Was an Insult

When I looked at popular productivity apps, almost all of them had converted to recurring SaaS subscriptions: \$8/month, \$12/month, or \$99/year. 

A focus timer is a utility that runs on your local CPU. It does not require continuous GPU clusters, it does not store gigabytes of user data on cloud servers, and it does not cost the developer money when you run it on your machine. Demanding a subscription for a clock is pure rent-seeking.

### How Reverie Solved It: \$19 Lifetime Purchase & 100% Offline Privacy

Reverie is built on the belief that **software should be treated like a fine physical instrument**:
- **Buy once, own forever**: \$19 for a lifetime license. No subscriptions, no renewal invoices.
- **100% Offline & Private**: All your tasks, timers, and daily streaks are stored in clean JSON files locally on your own machine (`%APPDATA%`). Zero accounts, zero tracking pixels, and zero cloud lock-in.

---

## The Result

Reverie was built to solve my own problems, but it has completely transformed how I work. It is quiet, tactile, responsive, and respectful of your attention.

If you are tired of abrasive alarms, bloated web apps, and recurring subscription rent, [claim the 14-day free trial of Reverie](https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11) or explore the [one-page showcase](/reverie).
