FROM ubuntu:20.04

ENV USERNAME=vscode
ENV USER_UID=1000
ENV USER_GID=$USER_UID
ENV TZ=America/Chicago

# Add timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Update system
RUN apt update && apt upgrade -y

# Add packages
RUN apt install -y sudo zsh curl wget git

# Add non-root user vscode
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set vscode as default user
USER $USERNAME

# Set zsh as the default shell
SHELL [ "/bin/zsh", "-c" ]

# Install oh-my-zsh
RUN sh -c \
    "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    "" --unattended

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | zsh

# Install node lts
RUN source ~/.zshrc && nvm install --lts

# Install yarn
RUN source ~/.zshrc && npm install -g yarn

# Install gatsby-cli
RUN source ~/.zshrc && yarn global add gatsby-cli

# Copy zsh config script
COPY files/config.zsh /home/$USERNAME/.oh-my-zsh/custom/config.zsh


