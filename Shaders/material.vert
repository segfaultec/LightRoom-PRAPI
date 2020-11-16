#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

out vec3 Normal;
out vec2 TexCoord;
out vec3 FragPos;

uniform mat4 pv;
uniform mat4 model;

void main() {
	gl_Position = pv * model * vec4(aPos, 1);
    Normal = aNormal;
    TexCoord = aTexCoord;
    FragPos = vec3(model * vec4(aPos, 1.0));
}