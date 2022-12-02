(setq make-backup-files nil) ;; Disable "<file>~" backups.

(defconst posts-org-files (getenv "POSTS_ORG_SRC"))

;; Setup packages using straight.el: https://github.com/raxod502/straight.el
(defvar bootstrap-version)
(let ((bootstrap-file
       (expand-file-name "straight/repos/straight.el/bootstrap.el" user-emacs-directory))
      (bootstrap-version 5))
  (unless (file-exists-p bootstrap-file)
    (with-current-buffer
        (url-retrieve-synchronously
         "https://raw.githubusercontent.com/raxod502/straight.el/develop/install.el"
         'silent 'inhibit-cookies)
      (goto-char (point-max))
      (eval-print-last-sexp)))
  (load bootstrap-file nil 'nomessage))

(setq straight-use-package-by-default t)
(straight-use-package 'use-package)

(use-package ox-hugo
  :straight (:type git :host github :repo "kaushalmodi/ox-hugo"))

;; Preserve indentation
(setq org-src-preserve-indentation t)

;;; Public functions
(defun build/export-all ()
  "Export all org-files (including nested) under posts-org-files."

  (setq org-hugo-base-dir (getenv "HUGO_BASE_DIR"))
  (setq org-hugo-section "posts")

  (dolist (org-file (directory-files-recursively posts-org-files "\.org$"))
    (with-current-buffer (find-file org-file)
      (org-hugo-export-wim-to-md :all-subtrees nil nil nil)))

  (message "Done!"))
