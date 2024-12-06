import pygame
import asyncio
import sys
import math
from random import choice, randint

# Screen Configuration
SCREEN_WIDTH = 1600
SCREEN_HEIGHT = 1000
SCREEN_TITLE = "Dynamic Fractal Tree"

# Colors
BACKGROUND = (20, 20, 30)
BRANCH_COLOR = (255, 255, 255)
BRANCH_BASE_COLOR = (139, 69, 19)  # Brown for the base
LEAF_COLOR = (25, 255, 25)

AUTUMN_LEAF_COLORS = [
    (210, 105, 30),  # Burnt Orange
    (255, 140, 0),  # Dark Orange
    (184, 134, 11),  # Dark Goldenrod
    (139, 69, 19),  # Saddle Brown
    (218, 165, 32),  # Goldenrod
    (244, 164, 96),  # Sandy Brown
    (205, 92, 92),  # Indian Red
    (188, 143, 143),  # Rosy Brown
    (160, 82, 45),  # Sienna
    (165, 42, 42),  # Brown
    (222, 184, 135),  # Burlywood
    (245, 222, 179),  # Wheat
    (255, 228, 181),  # Moccasin
    (255, 160, 122),  # Light Salmon
    (233, 150, 122),  # Dark Salmon
]


class Branch:
    def __init__(self, start_point, length, angle, depth, trunk=False):
        """
        Initialize a branch with its properties

        :param start_point: (x, y) coordinates of branch start
        :param length: length of the branch
        :param angle: angle of the branch from vertical
        :param depth: recursion depth of the branch
        """

        self.start_point = start_point
        self.length = length
        self.angle = angle
        self.depth = depth

        end_x: float
        end_y: float

        end_x = start_point[0] + length * math.sin(angle)
        end_y = start_point[1] - length * math.cos(angle)

        self.end_point = (end_x, end_y)

        # Optional: Store child branches
        self.left_branch = None
        self.right_branch = None

    def draw(self, screen):
        color = BRANCH_BASE_COLOR

        pygame.draw.line(
            screen, color, self.start_point, self.end_point, max(1, int(6 - self.depth))
        )
        if self.is_leaf() and self.depth > 4:
            if self.depth > 6:
                # seed(str(self.end_point))
                color = choice(AUTUMN_LEAF_COLORS)
            else:
                color = LEAF_COLOR
            leaf_size = 7
            leaf_size = randint(7, 13)

            pygame.draw.circle(screen, color, self.end_point, leaf_size)

        # Recursively draw child branches
        if self.left_branch:
            self.left_branch.draw(screen)
        if self.right_branch:
            self.right_branch.draw(screen)

    def is_leaf(self) -> bool:
        return not (self.right_branch and self.left_branch)

    def grow_branches(self):
        """
        Create child branches

        :param left_angle_delta: angle for left branch
        :param right_angle_delta: angle for right branch
        """

        offset = randint(2, 8)

        left_angle_delta = math.pi / offset
        right_angle_delta = math.pi / (10 - offset)

        if not self.left_branch:
            # Create left branch
            left_length = self.length * 0.85
            left_angle = self.angle - left_angle_delta
            self.left_branch = Branch(
                self.end_point, left_length, left_angle, self.depth + 1
            )

        if not self.right_branch:
            # Create right branch
            right_length = self.length * 0.85
            right_angle = self.angle + right_angle_delta
            self.right_branch = Branch(
                self.end_point, right_length, right_angle, self.depth + 1
            )

    def prune_branches(self):
        """
        Remove child branches
        """
        self.left_branch = None
        self.right_branch = None

    def get_max_depth(self):
        """
        Recursively find the maximum depth of the tree

        :return: Maximum depth of the tree
        """
        max_depth = self.depth

        if self.left_branch:
            max_depth = max(max_depth, self.left_branch.get_max_depth())

        if self.right_branch:
            max_depth = max(max_depth, self.right_branch.get_max_depth())

        return max_depth


class FractalTreeGame:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption(SCREEN_TITLE)
        self.clock = pygame.time.Clock()

        # Create initial tree trunk
        self.trunk = Branch((SCREEN_WIDTH // 2, SCREEN_HEIGHT), 150, 0, 0, trunk=True)

        self.font = pygame.font.Font(None, 75)

    def run(self):
        while True:
            if self.handle_events() or self.trunk.get_max_depth() == 0:
                self.draw()
            self.clock.tick(60)
            asyncio.sleep(0)

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            # Keyboard controls
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    # Grow branches when spacebar is pressed
                    self.grow(self.trunk)

                if event.key == pygame.K_BACKSPACE:
                    # Prune branches when backspace is pressed
                    self.prune(self.trunk)
                return True
            return False
        return False

    def grow(self, branch):
        """
        Recursively grow branches
        """
        if branch.left_branch:
            self.grow(branch.left_branch)
        if branch.right_branch:
            self.grow(branch.right_branch)

        if not branch.right_branch and not branch.left_branch:
            branch.grow_branches()

    def prune(self, branch):
        """
        Recursively prune branches
        """
        if branch.left_branch:
            if branch.left_branch.is_leaf():
                branch.prune_branches()
            else:
                self.prune(branch.left_branch)
        if branch.right_branch:
            if branch.right_branch.is_leaf():
                branch.prune_branches()
            else:
                self.prune(branch.right_branch)

    def draw_tree_depth(self):
        """
        Draw the current maximum depth of the tree in the top right corner
        """
        # Calculate the maximum depth
        max_depth = self.trunk.get_max_depth()

        # Render the depth text
        depth_text = f"Tree Depth: {max_depth}"
        text_surface = self.font.render(depth_text, True, (255, 255, 255))

        # Get the size of the text
        text_width = text_surface.get_width()
        text_height = text_surface.get_height()

        # Position in top right corner with a small margin
        position = (0, 10)  # 10 pixel margin from right  # 10 pixel margin from top

        # Draw the text
        self.screen.blit(text_surface, position)

    def draw(self):
        # Clear screen
        self.screen.fill(BACKGROUND)

        # Draw the tree
        self.trunk.draw(self.screen)

        self.draw_tree_depth()

        # Update display
        pygame.display.flip()


async def main():
    game = FractalTreeGame()
    game.run()



asyncio.run(main())
