document.addEventListener('DOMContentLoaded', function() {
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const outputFrame = document.getElementById('output-frame');
    const runButton = document.getElementById('run-button');
    const tabs = document.querySelectorAll('.tab');
    
    // Function to update the output
    function updateOutput() {
        const html = htmlCode.value;
        const css = `<style>${cssCode.value}</style>`;
        const js = `<script>${jsCode.value}<\/script>`;
        
        const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
        outputDoc.open();
        outputDoc.write(html + css + js);
        outputDoc.close();
        
        // Visual feedback
        runButton.style.backgroundColor = 'var(--success-color)';
        setTimeout(() => {
            runButton.style.backgroundColor = 'var(--primary-color)';
        }, 300);
    }
    
    // Update output when any code changes
    htmlCode.addEventListener('input', updateOutput);
    cssCode.addEventListener('input', updateOutput);
    jsCode.addEventListener('input', updateOutput);
    
    // Click event for run button
    runButton.addEventListener('click', updateOutput);
    
    // Keyboard shortcut (Ctrl+Enter) to run code
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            updateOutput();
        }
    });
    
    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            const editorBoxes = document.querySelectorAll('.editor-box');
            
            editorBoxes.forEach(box => {
                box.style.display = 'none';
            });
            
            document.querySelector(`.${tabName}-editor`).style.display = 'flex';
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Show all editors by default
    document.querySelectorAll('.editor-box').forEach(box => {
        box.style.display = 'flex';
    });
    
    // Initial update
    updateOutput();
    
    // Add Tab key support in textareas
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    });
});