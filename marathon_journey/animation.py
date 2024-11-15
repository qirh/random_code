import sys
import time
import json
import random

WIDTH = 80
HEIGHT = 50

def clear_screen():
    print("\033[2J", end='')

def reset_cursor():
    print("\033[H", end='')

def print_at_position(x, y, ch):
    if 0 <= x < WIDTH and 0 <= y < HEIGHT:
        print(f"\033[{y};{x}H{ch}", end='')

def load_data(filename):
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: '{filename}' file not found.")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from '{filename}'.")
        sys.exit(1)

def animate_runner(splits):
    frame = [
        " o ",
        "/|\\",
        "/ \\"
    ]
    total_speed = 0

    for idx, split in enumerate(splits):
        clear_screen()
        reset_cursor()
        for line in frame:
            print(' ' * idx + line)
        avg_speed = split.get('average_speed', 1)
        print(f'km {idx + 1}, avg_speed: {avg_speed}')
        total_speed += avg_speed
        time.sleep(0.2 / avg_speed)
        
    num_km = len(splits)
    overall_avg_speed = total_speed / num_km
    print(f'{num_km} KMs. average_speed: {overall_avg_speed}')

def display_fireworks():
    reset_cursor()
    num_fireworks = random.randint(4, 8)
    fireworks = []
    for _ in range(num_fireworks):
        x = random.randint(10, WIDTH - 10)
        y = random.randint(5, HEIGHT // 2)
        fireworks.append((x, y))

    for step in range(HEIGHT // 2, 0, -1):
        reset_cursor()
        for x, y in fireworks:
            print_at_position(x, y + step, '|')
        print()
        time.sleep(0.05)

    explosion_patterns = ['.', 'o', 'O', '@', '*', ' ']
    for frame in range(len(explosion_patterns)):
        reset_cursor()
        ch = explosion_patterns[frame]
        for x, y in fireworks:
            # Draw explosion
            for dx in range(-frame, frame + 1):
                for dy in range(-frame, frame + 1):
                    if abs(dx) + abs(dy) <= frame:
                        print_at_position(x + dx, y + dy, ch)
        print()
        time.sleep(0.2)


data = load_data('strava_data.json')
splits = data.get('splits_metric', [])


animate_runner(splits)
display_fireworks()

